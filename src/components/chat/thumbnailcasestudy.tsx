import React from 'react';

const ThumbnailCarousel = () => {
  const thumbnails = [
    { 
      name: "Project Alpha", 
      title: "Modern web application with React and TypeScript",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public",
      href: "/project-alpha"
    },
    { 
      name: "Project Beta", 
      title: "Mobile-first e-commerce platform",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public",
      href: "/project-beta"
    },
    { 
      name: "Project Gamma", 
      title: "AI-powered analytics dashboard",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public",
      href: "/project-gamma"
    },
    { 
      name: "Project Delta", 
      title: "Real-time collaboration tool",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public",
      href: "/project-delta"
    },
  ];

  return (
    <div style={{ width: '100%', height: '180px', overflow: 'hidden', margin: '16px 0' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '16px', 
        padding: '12px',
        overflowX: 'auto',
        overflowY: 'hidden',
        height: '100%',
        whiteSpace: 'nowrap'
      }}>
        {thumbnails.map((item, index) => (
          <div 
            key={index}
            style={{
              minWidth: '160px',
              width: '160px',
              height: '150px',
              flexShrink: 0,
              backgroundColor: '#002E34',
              border: '1px solid #444',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.transform = 'scale(1)'}
          >
            <div style={{ height: '90px', overflow: 'hidden' }}>
              <img
                alt={item.name}
                src={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="160" height="90" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#1a1a1a"/>
                      <text x="50%" y="50%" fill="#666" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12">
                        Preview
                      </text>
                    </svg>
                  `)}`;
                }}
              />
            </div>
            <div style={{ 
              padding: '8px 10px', 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}>
              <div style={{ 
                color: '#fff', 
                fontSize: '12px', 
                fontWeight: 'bold',
                marginBottom: '4px',
                lineHeight: '1.2',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}>
                {item.name}
              </div>
              <div style={{ 
                color: '#ccc', 
                fontSize: '10px',
                lineHeight: '1.3',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;