import classes from "./AntiDiscriminationPolicy.module.css"

const AntiDiscriminationPolicy = () => {
    return (
        <section className={classes.privacy_policy}>
            <div className={classes.heading_div}>
                <h1 className={classes.heading}>Anti Discrimination Policy</h1>
            </div>

            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <h3 className={classes.h3}>Anti Discrimination Policy</h3>

                    <p className={classes.p}>
                        AbhiCares seeks to empower millions of service professionals across the world to
                        deliver safe, reliable and high quality services at home. AbhiCares therefore does
                        not tolerate, and prohibits discrimination against customers or service providers
                        based on religion, caste, race, national origin, disability, sexual orientation, sex,
                        marital status, gender identity, age or any other characteristic that may protected
                        under applicable laws.
                    </p>
                    <p className={classes.p}>
                        Such discrimination includes, but is not limited to, refusing to provide or accept
                        services based on any of these characteristics.
                    </p>
                    <p className={classes.p}>
                        Any customer or service partner found to have violated this prohibition will lose
                        access to the AbhiCares platform.
                    </p>
                </div>
            </div>
        </section >
    )
}

export default AntiDiscriminationPolicy