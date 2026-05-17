'use client'

export default function FIcon({ name, size = 20, color = 'currentColor' }) {
  const paths = {
    shield: <><path d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.25C16.6 22.15 20 17.25 20 12V6l-8-4z" fill="none" stroke={color} strokeWidth="1.8"/><path d="M9 12l2 2 4-4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    sunrise: <><circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    snowflake: <><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill={color} opacity="0.3"/></>,
    package: <><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" fill="none" stroke={color} strokeWidth="1.8"/><path d="M3 7l9 4 9-4M12 11v10" stroke={color} strokeWidth="1.5"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="none" stroke={color} strokeWidth="1.8"/></>,
    search: <><circle cx="11" cy="11" r="7" fill="none" stroke={color} strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    cart: <><circle cx="9" cy="21" r="1.5" fill={color}/><circle cx="20" cy="21" r="1.5" fill={color}/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57L23 6H6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    moon: <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" stroke={color} strokeWidth="2"/></>,
    sun: <><circle cx="12" cy="12" r="5" fill="none" stroke={color} strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    menu: <><path d="M3 12h18M3 6h18M3 18h18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    x: <><path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    minus: <><path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    plus: <><path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" fill="none" stroke={color} strokeWidth="1.8"/></>,
    truck: <><path d="M1 3h15v13H1zM16 8h4l3 4v5h-7V8z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="5.5" cy="18.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="18.5" cy="18.5" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/></>,
    check: <><path d="M20 6L9 17l-5-5" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="none" stroke={color} strokeWidth="1.8"/><path d="M9 22V12h6v10" fill="none" stroke={color} strokeWidth="1.8"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="7" r="4" fill="none" stroke={color} strokeWidth="1.8"/></>,
    arrowLeft: <><path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    mapPin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="10" r="3" fill="none" stroke={color} strokeWidth="1.8"/></>,
    chevronRight: <><path d="M9 18l6-6-6-6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  )
}
