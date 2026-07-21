import { useContext } from "react"
import MessagesList from "./MessagesList"
import { ContactContext } from "../../Context/ContactContext"

// Componente que muestra controles para el chat y el listado de mensajes
function Messages() {
    const {contact_selected, deleteAllMessages, createMessage} = useContext(ContactContext)

    function handleCreateMessage (event) {
        event.preventDefault()
        // El valor se toma del textarea llamado "message"
        createMessage(event.target.message.value, true)

        // Resetea el form -> limpia el textarea
        event.target.reset()
    }

    const footer = { borderTop: '1px solid #eee', padding: 10, display: 'flex', gap: 8 }

    return (
        <div>
            {/* Botón para limpiar todo el historial del contacto */}
            <div style={{ marginBottom: 8 }}>
                <button onClick={deleteAllMessages}>Eliminar historial</button>
            </div>

            {/* Lista de mensajes */}
            <MessagesList />

            {/* Form simple para enviar un nuevo mensaje */}
            <form onSubmit={handleCreateMessage} style={footer}>
                <textarea id="message" name="message" placeholder="Escribí un mensaje" style={{ flex: 1, padding: 8 }} />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Messages



