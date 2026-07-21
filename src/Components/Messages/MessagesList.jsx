import { useContext } from "react"
import { ContactContext } from "../../Context/ContactContext"

function MessagesList() {
    const {contact_selected, deleteMessageById} = useContext(ContactContext)

    // Si no hay mensajes mostramos un texto amigable
    if(!contact_selected || contact_selected.messages.length === 0){
        return (
            <h2>Aún no hay historial de mensajes</h2>
        )
    }

    // Estilos sencillos para burbujas de mensajes
    const meStyle = { textAlign: 'right', margin: '10px 0' }
    const themStyle = { textAlign: 'left', margin: '10px 0' }
    const bubble = { display: 'inline-block', padding: 10, borderRadius: 12, maxWidth: '70%' }

    return contact_selected.messages.map(
        (message) => {
            return (
                <div key={message.id} style={message.sendByMe ? meStyle : themStyle}>
                    <div style={{ ...bubble, background: message.sendByMe ? '#dcf8c6' : '#fff', border: '1px solid #eee' }}>
                        <div style={{ fontSize: 14 }}>{message.content}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>
                            {message.sendByMe ? 'Tu' : contact_selected.name}
                        </div>
                    </div>
                    <div style={{ marginTop: 6 }}>
                        <button onClick={() => { deleteMessageById(message.id) }} style={{ fontSize: 12 }}>Eliminar</button>
                    </div>
                </div>
            )
        }
    )
}

export default MessagesList