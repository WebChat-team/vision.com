import Checkbox from "@/shared/ui/Checkbox";

export default function AdditionalSectionForm() {

    return (
        <>
            <Checkbox
                name="hasComments"
                title="Наличие комментариев"
                description="Вы можете отключить комментарии под своим видео"
            />
        </>
    );

}