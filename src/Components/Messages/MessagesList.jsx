import { useContext } from "react"
import { ContactContext } from "../../Context/ContactContext"

function MessagesList() {
    const { contact_selected, deleteMessageById } = useContext(ContactContext)

    // Si no hay mensajes mostramos un texto
    if (!contact_selected || contact_selected.messages.length === 0) {
        return (
            <h2>Aún no hay historial de mensajes</h2>
        )
    }

    // Estilos sencillos para burbujas de mensajes
    const meStyle = { textAlign: 'right', margin: '10px 0' }
    const themStyle = { textAlign: 'left', margin: '10px 0' }
    const bubble = { display: 'inline-block', padding: '8px 12px', borderRadius: 12, maxWidth: '70%', textAlign: 'left' }

    return contact_selected.messages.map(
        (message) => {
            return (
                <div key={message.id} style={message.sendByMe ? meStyle : themStyle}>
                    <div style={{ ...bubble, background: message.sendByMe ? '#dcf8c6' : '#fff', border: '1px solid #eee' }}>
                        <div style={{ fontSize: 14, color: '#111b21' }}>{message.content}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 4 }}>
                            <span style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>
                                {message.sendByMe ? 'Tú' : contact_selected.name}
                            </span>
                            <span style={{ fontSize: 10, color: '#888' }}>
                                {message.time}
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: 4 }}>
                        <button onClick={() => { deleteMessageById(message.id) }} style={{ fontSize: 12, color: '#d9534f', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Eliminar</button>
                    </div>
                </div>
            )
        }
    )
}

export default MessagesList