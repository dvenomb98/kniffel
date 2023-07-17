import { initialGameValues } from "@/config/game/config";
import { doc, setDoc, } from "firebase/firestore";
import { db } from "../../../firebase";
import { nanoid } from "nanoid";


export const createNewGame = async () => {
    try {
    const referenceID = nanoid()
    await setDoc(doc(db, "sessions", referenceID), {...initialGameValues, id: referenceID})
    const gameURL = `${window.location.origin}/play/${referenceID}`; 
    return gameURL;
    }
    catch (e) {
        console.error("Something went wrong:", e)
        return null
    }
}