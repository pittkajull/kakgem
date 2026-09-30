import { defaultSiteContent } from '../data/siteContent'

function OrgNode({ person, className = '' }) {
  const [role, name] = person
  const initials = name.split(/[^A-Za-z]+/).filter(Boolean).map(word => word[0]).slice(0, 2).join('')
  return <article className={`team-node ${className}`}>
    <span className="team-avatar">{initials}</span>
    <div><span className="team-role">{role}</span><h3>{name}</h3></div>
  </article>
}

export function TeamRosterSection({ content = defaultSiteContent }) {
  const team = content.team || defaultSiteContent.team
  return <section id="team" className="team section-pad">
    <div className="section-kicker">{team.kicker}</div>
    <div className="team-heading"><h2>{team.title}<br /><span>{team.highlight}</span></h2><p>{team.description}</p></div>
    <div className="team-map">
      <OrgNode person={team.leadership[0]} className="team-chair" />
      <div className="map-stem" />
      <OrgNode person={team.leadership[1]} className="team-vice" />
      <div className="map-branch" />
      <div className="team-map-lower">
        <div className="team-side team-side-stack team-secretary">
          <OrgNode person={team.leadership[2]} />
          <OrgNode person={team.leadership[3]} />
          <OrgNode person={team.leadership[4]} />
        </div>
        <div className="team-divisions">
          <div className="team-division-label">Bidang / Divisi</div>
          <div className="team-division-grid">{team.divisions.map(person => <OrgNode person={person} key={person[1]} />)}</div>
        </div>
        <div className="team-side team-side-stack team-treasurer">
          <OrgNode person={team.leadership[5]} />
          <OrgNode person={team.leadership[6]} />
        </div>
      </div>
    </div>
  </section>
}
