import FastFoodItem from "../FastFoodItem/fastFoodItem"

const FastFoodList = ({fastFoodItems, commentsCount}) => {
    let delay = 0.1
    return (
        <div className="row">
            {fastFoodItems.map((fastFood)=>{
                delay += 0.030
                return (
                    <div className="col-md-4 col-sm-6 mb-grid-gutter" key={fastFood.id}>
                        <FastFoodItem {...fastFood} delay={delay} commentsCount={commentsCount} />
                    </div>
                )
            })}
        </div>
    )
}

export default FastFoodList