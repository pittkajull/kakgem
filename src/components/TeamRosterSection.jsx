import { divisionsTeam, leadership } from '../data/siteData'

function RosterRow({ person }) {
  const [role, name] = person
  return <article className="roster-row"><span>{role}</span><strong>{name}</strong></article>
}

export function TeamRosterSection() {
  const leftDivisions = divisionsTeam.slice(0, 3)
  const rightDivisions = divisionsTeam.slice(3)

  return <section id="team" className="team section-pad">
    <div className="section-kicker">/05 — Tim kami</div>
    <div className="team-heading"><h2>Susunan<br /><span>pengurus.</span></h2><p>Kagama Digi digerakkan oleh pengurus harian dan bidang-bidang yang menjaga kolaborasi, kemitraan, komunitas, aktivasi digital, dan riset.</p></div>
    <div className="team-roster">
      <div className="team-roster-column">
        <h3>Pengurus Harian</h3>
        {leadership.map(person => <RosterRow person={person} key={person[1]} />)}
        {leftDivisions.map(person => <RosterRow person={person} key={person[1]} />)}
      </div>
      <div className="team-roster-column team-roster-right">
        {rightDivisions.map(person => <RosterRow person={person} key={person[1]} />)}
      </div>
    </div>
  </section>
}
