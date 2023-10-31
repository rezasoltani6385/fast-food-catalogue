const Comment = ({name, imageUrl, description, date})=>{
    return(
        <div className="d-flex align-items-start mx-5 py-4 border-bottom">
            <img className="rounded-circle" width='50' src={imageUrl} />
            <div className="pe-3">
                <h6 className="mb-0">{name}</h6>
                <p className="mb-1">{description}</p>
                <span className="fs-ms text-muted">{date}</span>
            </div>
        </div>
    )
}

export default Comment