function Video({videoId,title}){
    return(
        <div className="ratio ratio-16x9">
            <iframe
                src={"https://www.youtube.com/embed/" + videoId}
                title={title}
                className="border-0"
                loading="lazy"
                allowFullScreen
            />
        </div>
    );
}

export default Video;