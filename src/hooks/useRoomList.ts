import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type RoomSchema = {
    roomId: string;
    title: string;
    authorId: string
    endedAt: string;
}[]

export function useRoomList() {

    const [rooms, setRooms] = useState<RoomSchema>([])

    useEffect(() => {
        const databaseRoom = database.ref('rooms');
        databaseRoom.once('value', rooms => {
            const dataRoom: object = rooms.val() ?? {}
            const parsedRooms = Object.entries(dataRoom).map(([key, value]) => {
                return {
                    roomId: key,
                    title: value.title,
                    authorId: value.authorId,
                    endedAt: value.endedAt
                }
            })
            setRooms(parsedRooms)
        })
    }, [])

    return { rooms }
}