import classes from "./LeaderCard.module.css";

const LeaderCard = ({ src, name, role, social, desc }) => {
    return (
        <div className={classes.card}>
            <img className={classes.card_img} src={src} alt="team member" />
            <p className={classes.name}>{name}</p>
            <p className={classes.role}>{role}</p>
            <div className={classes.social_container}>
                {
                    social.map(({ url, img }, i) => (
                        <a key={i} href={url}>
                            <img className={classes.social_img} src={img} alt="social" />
                        </a>
                    ))
                }
            </div>
            <p className={classes.p}>{desc}</p>
        </div>
    );
};

export default LeaderCard;