import { useContext, useRef, useEffect } from "react"
import MessagesList from "./MessagesList"
import { ContactContext } from "../../Context/ContactContext"
import "./Messages.css"

// Componente que muestra controles para el chat y el listado de mensajes
function Messages() {
    const { contact_selected, createMessage } = useContext(ContactContext)
    const messagesEndRef = useRef(null)

    function handleCreateMessage (event) {
        event.preventDefault()
        const messageInput = event.target.message
        if (messageInput.value.trim() === "") return
        
        createMessage(messageInput.value, true)
        event.target.reset()
    }

    // Desplazamiento automático al final cuando llega un mensaje o cambia de chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [contact_selected?.messages])

    return (
        <div className="chat-messages-wrapper" id="chat-messages-wrapper">
            {/* Contenedor con scroll para la lista de mensajes */}
            <div className="chat-messages-scroll" id="chat-messages-scroll-panel">
                <MessagesList />
                <div ref={messagesEndRef} />
            </div>

            {/* Barra de entrada de mensajes al estilo WhatsApp */}
            <footer className="chat-input-bar" id="chat-input-footer" aria-label="Editor de mensajes">
                {/* Botón de adjuntar archivos */}
                <button type="button" className="icon-btn" title="Adjuntar archivos" aria-label="Adjuntar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                </button>
                
                {/* Formulario del campo de texto */}
                <form onSubmit={handleCreateMessage} className="chat-input-form" id="chat-input-form">
                    <input 
                        id="message" 
                        name="message" 
                        placeholder="Escribe un mensaje" 
                        className="chat-input-field"
                        autoComplete="off"
                        required
                    />
                    
                    {/* Botón de enviar mensaje */}
                    <button type="submit" className="chat-send-btn" title="Enviar mensaje" aria-label="Enviar">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </footer>
        </div>
    )
}

export default Messages



