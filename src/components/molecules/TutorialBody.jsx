import Text from "../atoms/Text";

function TutorialBody({title, description}){
    return(
        <>
            <Text variant="h2" className="h5 mb-2">
                {title}
            </Text>

            <Text variant="p" className="text-muted mb-3">
                {description}
            </Text>
        </>
    );
}

export default TutorialBody;