import { Children } from 'react'

export function LayoutCard({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="gpc-layout-card">
      {title && (
        <div className="gpc-layout-card-header">
          <h3 className="gpc-layout-card-title">{title}</h3>
        </div>
      )}
      <div className="gpc-layout-card-body">{children}</div>
    </div>
  )
}
