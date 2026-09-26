export default async function handler(req, res) {
  const ADMIN_TELEGRAM_ID = "6504138324";

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      ok: false,
      message: "Missing Supabase environment variables"
    });
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json"
  };

  try {
    // =====================================================
    // GET
    // =====================================================

    if (req.method === "GET") {
      const {
        telegram_chat_id,
        admin,
        conversation_id
      } = req.query || {};

      // ---------------------------------------------------
      // ADMIN: Load all conversations
      // ---------------------------------------------------

      if (admin === "true") {
        if (String(telegram_chat_id) !== ADMIN_TELEGRAM_ID) {
          return res.status(403).json({
            ok: false,
            message: "Admin access denied"
          });
        }

        const response = await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?select=*` +
          `&order=last_message_at.desc.nullslast`,
          {
            method: "GET",
            headers
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return res.status(500).json({
            ok: false,
            message: "Could not load conversations",
            error: data
          });
        }

        return res.status(200).json({
          ok: true,
          conversations: data
        });
      }

      // ---------------------------------------------------
      // ADMIN: Load one conversation messages
      // ---------------------------------------------------

      if (
        conversation_id &&
        String(telegram_chat_id) === ADMIN_TELEGRAM_ID
      ) {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/support_messages` +
          `?conversation_id=eq.${encodeURIComponent(
            String(conversation_id)
          )}` +
          `&select=*` +
          `&order=created_at.asc`,
          {
            method: "GET",
            headers
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return res.status(500).json({
            ok: false,
            message: "Could not load messages",
            error: data
          });
        }

        // Mark admin-visible messages as read
        await fetch(
          `${supabaseUrl}/rest/v1/support_messages` +
          `?conversation_id=eq.${encodeURIComponent(
            String(conversation_id)
          )}` +
          `&sender_type=eq.user` +
          `&is_read=eq.false`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              is_read: true
            })
          }
        );

        // Reset admin unread count
        await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?id=eq.${encodeURIComponent(
            String(conversation_id)
          )}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              unread_admin_count: 0
            })
          }
        );

        return res.status(200).json({
          ok: true,
          messages: data
        });
      }

      // ---------------------------------------------------
      // USER
      // ---------------------------------------------------

      if (!telegram_chat_id) {
        return res.status(400).json({
          ok: false,
          message: "telegram_chat_id is required"
        });
      }

      const conversationResponse = await fetch(
        `${supabaseUrl}/rest/v1/support_conversations` +
        `?telegram_chat_id=eq.${encodeURIComponent(
          String(telegram_chat_id)
        )}` +
        `&select=*` +
        `&limit=1`,
        {
          method: "GET",
          headers
        }
      );

      const conversations = await conversationResponse.json();

      if (!conversationResponse.ok) {
        return res.status(500).json({
          ok: false,
          message: "Could not load support conversation",
          error: conversations
        });
      }

      // No conversation yet
      if (!conversations.length) {
        return res.status(200).json({
          ok: true,
          conversation: null,
          messages: []
        });
      }

      const conversation = conversations[0];

      const messagesResponse = await fetch(
        `${supabaseUrl}/rest/v1/support_messages` +
        `?conversation_id=eq.${conversation.id}` +
        `&select=*` +
        `&order=created_at.asc`,
        {
          method: "GET",
          headers
        }
      );

      const messages = await messagesResponse.json();

      if (!messagesResponse.ok) {
        return res.status(500).json({
          ok: false,
          message: "Could not load support messages",
          error: messages
        });
      }

      // Mark admin replies as read for this user
      await fetch(
        `${supabaseUrl}/rest/v1/support_messages` +
        `?conversation_id=eq.${conversation.id}` +
        `&sender_type=eq.admin` +
        `&is_read=eq.false`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            is_read: true
          })
        }
      );

      // Reset user unread count
      await fetch(
        `${supabaseUrl}/rest/v1/support_conversations` +
        `?id=eq.${conversation.id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            unread_user_count: 0
          })
        }
      );

      return res.status(200).json({
        ok: true,
        conversation,
        messages
      });
    }

    // =====================================================
    // POST
    // =====================================================

    if (req.method === "POST") {
      const body = req.body || {};

      const {
        telegram_chat_id,
        message_text,
        sender_type = "user",
        conversation_id
      } = body;

      if (!telegram_chat_id || !message_text) {
        return res.status(400).json({
          ok: false,
          message:
            "telegram_chat_id and message_text are required"
        });
      }

      const text = String(message_text).trim();

      if (!text) {
        return res.status(400).json({
          ok: false,
          message: "Message cannot be empty"
        });
      }

      if (text.length > 4000) {
        return res.status(400).json({
          ok: false,
          message: "Message is too long"
        });
      }

      // ===================================================
      // USER MESSAGE
      // ===================================================

      if (sender_type === "user") {
        let conversation;

        // Find existing conversation
        const existingResponse = await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?telegram_chat_id=eq.${encodeURIComponent(
            String(telegram_chat_id)
          )}` +
          `&select=*` +
          `&limit=1`,
          {
            method: "GET",
            headers
          }
        );

        const existing = await existingResponse.json();

        if (!existingResponse.ok) {
          return res.status(500).json({
            ok: false,
            message: "Could not check conversation",
            error: existing
          });
        }

        // Existing conversation
        if (existing.length) {
          conversation = existing[0];
        } else {
          // Create new conversation
          const createResponse = await fetch(
            `${supabaseUrl}/rest/v1/support_conversations`,
            {
              method: "POST",
              headers: {
                ...headers,
                Prefer: "return=representation"
              },
              body: JSON.stringify({
                telegram_chat_id: String(telegram_chat_id),
                status: "open",
                unread_user_count: 0,
                unread_admin_count: 1,
                last_message_at:
                  new Date().toISOString()
              })
            }
          );

          const created = await createResponse.json();

          if (!createResponse.ok || !created.length) {
            return res.status(500).json({
              ok: false,
              message: "Could not create conversation",
              error: created
            });
          }

          conversation = created[0];
        }

        // Save user message
        const messageResponse = await fetch(
          `${supabaseUrl}/rest/v1/support_messages`,
          {
            method: "POST",
            headers: {
              ...headers,
              Prefer: "return=representation"
            },
            body: JSON.stringify({
              conversation_id: conversation.id,
              telegram_chat_id: String(
                telegram_chat_id
              ),
              sender_type: "user",
              message_text: text,
              is_read: false
            })
          }
        );

        const message = await messageResponse.json();

        if (!messageResponse.ok) {
          return res.status(500).json({
            ok: false,
            message: "Could not send message",
            error: message
          });
        }

        // Update conversation
        await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?id=eq.${conversation.id}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              status: "open",
              unread_admin_count:
                Number(
                  conversation.unread_admin_count || 0
                ) + 1,
              last_message_at:
                new Date().toISOString()
            })
          }
        );

        return res.status(200).json({
          ok: true,
          conversation_id: conversation.id,
          message: message[0]
        });
      }

      // ===================================================
      // ADMIN MESSAGE
      // ===================================================

      if (sender_type === "admin") {
        if (
          String(telegram_chat_id) !==
          ADMIN_TELEGRAM_ID
        ) {
          return res.status(403).json({
            ok: false,
            message: "Admin access denied"
          });
        }

        if (!conversation_id) {
          return res.status(400).json({
            ok: false,
            message: "conversation_id is required"
          });
        }

        // Find conversation
        const conversationResponse = await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?id=eq.${encodeURIComponent(
            String(conversation_id)
          )}` +
          `&select=*` +
          `&limit=1`,
          {
            method: "GET",
            headers
          }
        );

        const conversations =
          await conversationResponse.json();

        if (
          !conversationResponse.ok ||
          !conversations.length
        ) {
          return res.status(404).json({
            ok: false,
            message: "Conversation not found"
          });
        }

        const conversation = conversations[0];

        // Save admin reply
        const messageResponse = await fetch(
          `${supabaseUrl}/rest/v1/support_messages`,
          {
            method: "POST",
            headers: {
              ...headers,
              Prefer: "return=representation"
            },
            body: JSON.stringify({
              conversation_id: conversation.id,
              telegram_chat_id:
                conversation.telegram_chat_id,
              sender_type: "admin",
              message_text: text,
              is_read: false
            })
          }
        );

        const message = await messageResponse.json();

        if (!messageResponse.ok) {
          return res.status(500).json({
            ok: false,
            message: "Could not send admin reply",
            error: message
          });
        }

        // Update conversation
        await fetch(
          `${supabaseUrl}/rest/v1/support_conversations` +
          `?id=eq.${conversation.id}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              status: "open",
              unread_user_count:
                Number(
                  conversation.unread_user_count || 0
                ) + 1,
              unread_admin_count: 0,
              last_message_at:
                new Date().toISOString()
            })
          }
        );

        return res.status(200).json({
          ok: true,
          conversation_id: conversation.id,
          message: message[0]
        });
      }

      // ===================================================
      // INVALID SENDER
      // ===================================================

      return res.status(400).json({
        ok: false,
        message: "Invalid sender_type"
      });
    }

    // =====================================================
    // METHOD NOT ALLOWED
    // =====================================================

    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });

  } catch (error) {
    console.error("Support API error:", error);

    return res.status(500).json({
      ok: false,
      message: "Support server error"
    });
  }
}
