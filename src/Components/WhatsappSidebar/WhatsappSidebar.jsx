import React, { useContext } from 'react'
import { Link } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'

// Barra lateral que muestra contactos. Usa estilos sencillos inline
const WhatsappSidebar = () => {
    const {contacts} = useContext(ContactContext)

    const sidebar = { width: 300, borderRight: '1px solid #ddd', padding: 12, boxSizing: 'border-box', background: '#fafafa', minHeight: '100vh' }
    const item = { padding: '10px', borderRadius: 6, marginBottom: 6, textDecoration: 'none', color: 'inherit', display: 'block' }
    const nameStyle = { fontWeight: 600 }
    const lastMsg = { fontSize: 13, color: '#666' }

    return (
        <aside style={sidebar}>
            <h2 style={{ marginTop: 0 }}>WhatsApp</h2>
            <div>
                {
                    contacts.map(
                        (contact) => {
                            return (
                                <Link to={`/contact/${contact.id}`} key={contact.id} style={item}>
                                    <div style={nameStyle}>{contact.name}</div>
                                    <div style={lastMsg}>{contact.lastMessage}</div>
                                </Link>
                            )
                        }
                    )
                }
            </div>
        </aside>
    )
}

export default WhatsappSidebar