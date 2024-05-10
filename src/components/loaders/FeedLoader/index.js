import PageLoader from "../PageLoader"
import classes from "./FeedLoader.module.css"

const FeedLoader = ({mobile, open}) => {
    if(mobile && open) return <PageLoader open={open} />
    return (
        <div className={classes.loading__container}>
            {Array.from({ length: 1 }, (_, index) => index).map((index) => (
                <div
                    key={index}
                    className={classes.loading__item}
                >
                    <span className={`${classes.skeleton} ${classes.image}`}></span>
                    <div style={{ display: "flex", flexDirection: 'column', gap: "10px", width:"calc(100% - 225px)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <span className={classes.skeleton} style={{ width: "300px", height: "40px" }}></span>
                            <div style={{ display: "flex", gap: "4px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span className={classes.skeleton} style={{ width: "100px", height: "15px" }}></span>
                                    <span className={classes.skeleton} style={{ width: "100px", height: "15px" }}></span>
                                </div>
                                <span className={classes.skeleton} style={{ width: "34px", height: "34px" }}></span>
                            </div>
                        </div>
                        <span className={classes.skeleton} style={{ width: "100%", height: "100px" }}></span>
                        <div style={{ display: "flex", justifyContent:"space-between" }}>
                            <div style={{ display: "flex", gap: "4px" }}>
                                <span className={classes.skeleton} style={{ width: "50px", height: "20px" }}></span>
                                <span className={classes.skeleton} style={{ width: "50px", height: "20px" }}></span>
                            </div>
                            <span className={classes.skeleton} style={{ width: "120px", height: "20px" }}></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeedLoader