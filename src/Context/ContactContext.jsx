import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";

const ContactContext = createContext()

const server_contacts = [
    {
        id: 1,
        name: "Gabriel Delgado",
        avatarUrl: "/avatars/Gabri.jpeg",
        phone: "+54 9 11 4567-8901",
        info: "¡Hola! Estoy usando WhatsApp y practicando React en la UTN 🚀",
        infoDate: "15 de mayo",
        status: "en línea",
        lastMessage: "Nos vemos mañana!",
        unreadCount: 0,
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "10:14"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!",
                time: "10:15"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?",
                time: "10:20"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Nos vemos mañana!",
                time: "10:22"
            }
        ]
    },
    {
        id: 2,
        name: "María Gómez",
        avatarUrl: "/avatars/Mari.jpeg",
        phone: "+54 9 11 8765-4321",
        info: "En la facultad 📚 | Respuestas sólo por la tarde",
        infoDate: "20 de junio",
        status: "últ. vez hoy a las 09:12",
        lastMessage: "Dale, gracias 🙏",
        unreadCount: 0,
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "09:00"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Te pasé la información",
                time: "09:05"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Dale, gracias 🙏",
                time: "09:10"
            }
        ]
    },
    {
        id: 3,
        name: "Mariano Alvarez",
        avatarUrl: "/avatars/mariano.jpg",
        phone: "+54 9 11 2345-6789",
        info: "Disponible para llamadas urgentes ⚡",
        infoDate: "Ayer",
        status: "en línea",
        lastMessage: "Te mando el archivo",
        unreadCount: 2, //Simulación de 2 mensajes no leídos
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "08:15"
            },
            {
                id: 2,
                sendByMe: false,
                content: "Te mando el archivo",
                time: "08:18"
            }
        ]
    },
    {
        id: 4,
        name: "Sofi Baez",
        avatarUrl: "/avatars/Sofi_Baez.jpeg",
        phone: "+54 9 11 3456-7890",
        info: "Programando en JavaScript y explorando Web Apps 💻",
        infoDate: "Hace una semana",
        status: "últ. vez ayer a las 22:45",
        lastMessage: "Jajaja sí",
        unreadCount: 0,
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "Viste la foto?",
                time: "Ayer"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Jajaja sí",
                time: "Ayer"
            }
        ]
    },
    {
        id: 5,
        name: "Wili Herbas",
        avatarUrl: "/avatars/Wili Herbas.jpeg",
        phone: "+59 1 87 6772-7632",
        info: "Trabajando como Freelance y creando páginas web 🤓💻",
        infoDate: "Ayer",
        status: "en línea",
        lastMessage: "Dale, nos vemos en la facultad!",
        unreadCount: 0,
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "Nos vemos en la facultad!",
                time: "10:00"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Dale, nos vemos en la facultad!",
                time: "10:10"
            }
        ]
    },
]

function ContactContextProvider() {
    const [contacts, setContacts] = useState(server_contacts)

    const { contact_id } = useParams()

    let contact_selected = null

    if (contact_id) {
        contact_selected = contacts.find(contact => contact.id === Number(contact_id))
    }

    function deleteMessageById(message_id) {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    const filteredMessages = contact.messages.filter(message => message.id !== Number(message_id))
                    const lastMsg = filteredMessages.length > 0 ? filteredMessages[filteredMessages.length - 1].content : ""
                    return {
                        ...contact,
                        messages: filteredMessages,
                        lastMessage: lastMsg
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    function createMessage(value, sendByMe) {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const currentTime = `${hours}:${minutes}`

        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    const new_message = {
                        content: value,
                        sendByMe: sendByMe,
                        id: Date.now(),
                        time: currentTime
                    }
                    const updatedMessages = [...contact.messages, new_message]
                    return {
                        ...contact,
                        lastMessage: value,
                        messages: updatedMessages
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    function deleteAllMessages() {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        messages: [],
                        lastMessage: ""
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    function createContact(name, phone, info) {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const currentTime = `${hours}:${minutes}`
        const newId = Date.now()

        const newContact = {
            id: newId,
            name: name,
            phone: phone || "+54 9 11 0000-0000",
            info: info || "¡Hola! Estoy usando WhatsApp.",
            infoDate: "Hoy",
            status: "en línea",
            lastMessage: "¡Chat iniciado!",
            messages: [
                {
                    id: Date.now(),
                    sendByMe: false,
                    content: `¡Hola! Has añadido a ${name} a tus contactos.`,
                    time: currentTime
                }
            ]
        }

        setContacts((prevContacts) => [newContact, ...prevContacts])
        return newId
    }

    const [userProfile, setUserProfile] = useState({
        name: "AlainDev",
        phone: "+54 9 11 9876-5432",
        info: "¡Hola! Estoy usando WhatsApp y practicando React en la UTN 🚀",
        avatarUrl: "/avatars/alaindev.png",
        status: "en línea"
    })

    const [showUserProfile, setShowUserProfile] = useState(false)

    const provider_values = {
        contacts: contacts,
        contact_selected,
        userProfile,
        setUserProfile,
        showUserProfile,
        setShowUserProfile,
        deleteMessageById,
        createMessage,
        deleteAllMessages,
        createContact
    }

    return (
        <ContactContext.Provider value={provider_values}>
            <Outlet />
        </ContactContext.Provider>
    )
}

export { ContactContext, ContactContextProvider }