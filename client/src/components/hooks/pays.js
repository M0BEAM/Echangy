import { useContext } from "react";
import { LanguageCtx } from "../contexts/language";

const Pays = () => {
    const { language } = useContext(LanguageCtx)
    if(language === "en")
    return [
        "Tout","Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
        "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", "Médenine",
        "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur",
        "Tunis", "Zaghouan"
    ]
    else if(language === "ar")
    return [
        "الكل",
        "أريانة",
        "باجة",
        "بن عروس",
        "بنزرت",
        "قابس",
        "قفصة",
        "جندوبة",
        "القيروان",
        "القصرين",
        "قبلي",
        "الكاف",
        "المهدية",
        "منوبة",
        "مدنين",
        "المنستير",
        "نابل",
        "صفاقس",
        "سيدي بوزيد",
        "سليانة",
        "سوسة",
        "تطاوين",
        "توزر",
        "تونس",
        "زغوان"
    ]
    
}

export default Pays;