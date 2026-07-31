import { useContext } from "react"
import { ContactContext } from "../../Context/ContactContext"
import "./Messages.css"

function MessagesList() {
    const { contact_selected, deleteMessageById } = useContext(ContactContext)

    // Si no hay mensajes mostramos un badge indicador
    if (!contact_selected || !contact_selected.messages || contact_selected.messages.length === 0) {
        return (
            <div className="chat-empty-messages" id="empty-chat-messages">
                <div className="empty-chat-badge" id="empty-chat-badge">
                    No hay mensajes en este chat. ¡Escribe un mensaje para comenzar la conversación!
                </div>
            </div>
        )
    }

    return contact_selected.messages.map((message) => {
        const isMe = message.sendByMe
        const bubbleClass = isMe ? "message-bubble sent" : "message-bubble received"
        const rowClass = isMe ? "message-row right" : "message-row left"

        return (
            <div key={message.id} className={rowClass} id={`message-row-${message.id}`}>
                <div className={bubbleClass} id={`message-bubble-${message.id}`}>
                    {/* Texto del mensaje */}
                    <div className="message-text">{message.content}</div>
                    
                    {/* Metadatos (Hora y Status Checkmarks) */}
                    <div className="message-meta">
                        <span className="message-time">{message.time}</span>
                        {isMe && (
                            <span className="message-status" title="Visto">
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M15 3L8.5 9.5L5.5 6.5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.5 3L8.5 5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.5 9.5L1.5 5.5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        )}
                    </div>
                    
                    {/* Botón de eliminar en hover */}
                    <button 
                        className="message-delete-btn" 
                        onClick={() => deleteMessageById(message.id)} 
                        title="Eliminar mensaje"
                        aria-label="Eliminar mensaje"
                        id={`delete-msg-btn-${message.id}`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        )
    })
}

export default MessagesList