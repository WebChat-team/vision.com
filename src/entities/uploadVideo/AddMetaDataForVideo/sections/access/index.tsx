import Checkbox from "@/shared/ui/Checkbox";
import InputForm from "@/shared/ui/InputForm";
import SelectForm from "@/shared/ui/SelectForm";
import Option from "@/shared/ui/SelectForm/components/Option";

export default function AccessSectionForm() {

    return (
        <>
            <SelectForm name="levelAccess" defaultValue="limited" description="Выбор уровня доступа">
                <Option value="limited">Ограниченный</Option>
                <Option value="public">Общедоступный</Option>
                <Option value="link">По ссылке</Option>
            </SelectForm>
            <Checkbox
                name="hasDownload"
                title="Возможность загрузить видео"
                description="Вы можете позволить пользователям скачать ваше видео на данной платформе"
            />
        </>
    );

}