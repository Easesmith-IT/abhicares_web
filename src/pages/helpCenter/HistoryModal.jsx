import React from 'react'
import Timeline from '../AdminPanel/helpCenter/TimeLine'

const HistoryModal = ({ ticketHistory }) => {
    const history = (val) => ticketHistory?.find((ticket) => ticket?.status === val)
    return (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ position: "relative", paddingBottom: "40px" }}>
                <Timeline
                    title="Raised"
                    time={history("raised") ? history("raised")?.date : ""}
                    status={history("raised")?.status || ""}
                    className={history("raised") ? "bg-green" : "bg-gray"}
                    desc={history("raised")?.resolution || ""}
                />
                <div className="vertical-line"></div>
            </div>

            <div style={{ position: "relative", paddingBottom: "40px" }}>
                <Timeline
                    title="In Progress"
                    time={history("in-review") ? history("in-review")?.date : ""}
                    status={history("in-review")?.status || ""}
                    className={history("in-review") ? "bg-green" : "bg-gray"}
                    desc={history("in-review")?.resolution || ""}
                />

                <div className="vertical-line"></div>
            </div>

            <Timeline
                title="Completed"
                time={history("completed") ? history("completed")?.date : ""}
                status={history("completed")?.status || ""}
                className={history("completed") ? "bg-green" : "bg-gray"}
                desc={history("completed")?.resolution || ""}
            />
        </div>
    )
}

export default HistoryModal