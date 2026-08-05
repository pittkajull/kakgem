import { divisionsTeam, leadership } from '../data/siteData'

function OrgNode({ person, className = '' }) {
  const [role, name] = person
  const initials = name.split(/[^A-Za-z]+/).filter(Boolean).map(word => word[0]).slice(0, 2).join('')
  return <article className={`team-node ${className}`}>
    <span className="team-avatar">{initials}</span>
    <div><span className="team-role">{role}</span><h3>{name}</h3></div>
  </article>
}

export function TeamRosterSection() {
  return <section id="team" className="team section-pad">
    <div className="section-kicker">/05 — Tim kami</div>
    <div className="team-heading"><h2>Susunan<br /><span>pengurus.</span></h2><p>Kagama Digi digerakkan oleh pengurus harian dan bidang-bidang yang menjaga kolaborasi, kemitraan, komunitas, aktivasi digital, dan riset.</p></div>
    <div className="team-map">
      <OrgNode person={leadership[0]} className="team-chair" />
      <div className="map-stem" />
      <OrgNode person={leadership[1]} className="team-vice" />
      <div className="map-branch" />
      <div className="team-map-lower">
        <div className="team-side team-side-stack team-secretary">
          <OrgNode person={leadership[2]} />
          <OrgNode person={leadership[3]} />
          <OrgNode person={leadership[4]} />
        </div>
        <div className="team-divisions">
          <div className="team-division-label">Bidang / Divisi</div>
          <div className="team-division-grid">{divisionsTeam.map(person => <OrgNode person={person} key={person[1]} />)}</div>
        </div>
        <div className="team-side team-side-stack team-treasurer">
          <OrgNode person={leadership[5]} />
          <OrgNode person={leadership[6]} />
        </div>
      </div>
    </div>
  </section>
}
