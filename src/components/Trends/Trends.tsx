import { useRef } from "react";
import { langType } from "@/types/generalTypes";
import styling from "./Trends.module.less";

import { EventType, EventsDataType } from "@/types/HomeTypes";
type Props = {
  language: langType;
  eventsData: EventsDataType;
};

export default function Trends({ language, eventsData }: Props) {
  return (
    <div className={`${styling.tew}`}>
      <div className={styling.tewHeader}>
        <div className={styling.tewTitle}>
          {language === "fr" ? "Tendances" : "Trends"}
        </div>
      </div>
      <div className={`${styling.tewWrapper}`}>
        <div className={`${styling.tewList}  `}>
          {eventsData.events.map((event: EventType) => (
            <Card event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = ({ event }: { event: EventType }) => {
  const competition = event.headToHead != "1";
  return (
    <a
      className={`${styling.tewCard} ${
        competition ? styling.tewCardCompetition : ""
      }`}
      data-linktracking={event.eventDescription}
      href={event.aliasUrl}
    >
      <img
        className={styling.tewIcon}
        src={`https://dcp.lmms.be/uploads/team_icons/${event.home_image}`}
        alt=""
      />

      <div
        className={`${styling.tewContent} ${
          competition ? styling.tewContentCompetition : ""
        }`}
      >
        <div className={competition ? styling.tewCompetitionGroup : ""}>
          <div className={styling.tewName}> {event.team_home}</div>
          <span
            className={`${styling.tewLeague} ${
              competition ? styling.tewLeagueCompetition : ""
            }`}
          >
            {event.meetingDescription}
          </span>
        </div>
        <div
          className={`${styling.tewStatus} ${
            event.live == 1 ? styling.tewStatusLive : ""
          }`}
        >
          {event.live == 1 ? "LIVE" : event.eventDate}
        </div>
      </div>
      {!competition && (
        <img
          className={styling.tewIcon}
          src={`https://dcp.lmms.be/uploads/team_icons/${event.away_image}`}
          alt=""
        />
      )}
    </a>
  );
};
