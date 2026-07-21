import React, { useContext } from 'react'
import { Link } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import { ContactContext } from '../../Context/ContactContext'

// Pantalla de chat para un contacto seleccionado.
// Usa el ContactContext para obtener el contacto actual y los helpers de mensajes.
const ContactChatScreen = () => {
    const {contact_selected} = useContext(ContactContext)

    const layout = { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }
    const chatArea = { flex: 1, display: 'flex', flexDirection: 'column' }
    const header = { padding: 12, borderBottom: '1px solid #eee', fontWeight: 600 }

    if (!contact_selected) {
        return (
            <div style={layout}>
                <WhatsappSidebar />
                <div style={{ padding: 20 }}>
                    <h2>Contacto no encontrado</h2>
                    <Link to="/">Volver a inicio</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={layout}>
            <WhatsappSidebar />
            <div style={chatArea}>
                <div style={header}>{contact_selected.name}</div>
                <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
                    <Messages />
                </div>
            </div>
        </div>
    )
}

export default ContactChatScreen