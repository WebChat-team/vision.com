import AccountSlide from "@/widgets/AccountSlide";
import Search from "@/widgets/Search";
import VideoSlide from "@/widgets/VideoSlide";

export const Apps = {
    account: {
        name: "Аккаунт",
        icon: "account",
        component: <AccountSlide />
    },
    // collection: {
    //     name: "Коллекция",
    //     icon: "collection",
    //     component: <div>Коллекция</div>
    // },
    // messages: {
    //     name: "Уведомления",
    //     icon: "messages",
    //     component: <div>Уведомления</div>
    // },
    search: {
        name: "Поиск",
        icon: "search",
        component: <Search />
    },
    // settings: {
    //     name: "Настройки",
    //     icon: "settings",
    //     component: <div>Настройки</div>
    // },
    // studio: {
    //     name: "Студия",
    //     icon: "studio",
    //     component: <div>Студия</div>
    // },
    watch: {
        name: "Видеоплеер",
        icon: "watch",
        component: <VideoSlide />
    },
    // support: {
    //     name: "Поддержка",
    //     icon: "support",
    //     component: <div>Поддержка</div>
    // },
    // channel: {
    //     name: "Канал",
    //     icon: "channel",
    //     component: <div>Канал</div>
    // },
};
export type AppName = keyof typeof Apps;