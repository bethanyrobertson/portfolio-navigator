export default function ThumbnailCarousel() {
  
  const thumbnails = [
    { 
      name: "[Project Title 1]", 
      title: "[Project Description]",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public"
    },
    { 
      name: "[Project Title 2]", 
      title: "[Project Description]",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public"
    },
    { 
      name: "[Project Title 3]", 
      title: "[Project Description]",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public"
    },
    { 
      name: "[Project Title 4]", 
      title: "[Project Description]",
      image: "https://imagedelivery.net/N-MD9o_LYLdDJqNonHl96g/01e63899-bc9e-455b-7b28-86fe975c7400/public"
    },
  ];

  const handleClick = (projectName: string) => {
    console.log(`Clicked on ${projectName} - TODO: Add your project link here`);
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden mt-4 mb-4">
      <div 
        className="flex flex-nowrap gap-4 px-4 py-4" 
        style={{ 
          display: 'flex',
          flexDirection: 'row',
          minWidth: 'max-content'
        }}
      >
        {thumbnails.map((item, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleClick(item.name)}
            style={{ width: '220px', minWidth: '220px', maxWidth: '220px' }}
          >
            <div className="w-full bg-[#1a2e35] rounded-lg overflow-hidden border border-gray-600 hover:border-[#4a9eff] transition-all duration-300 shadow-lg hover:shadow-xl">
              {/* Image Section */}
              <div className="h-28 overflow-hidden bg-gray-800">
                <img
                  alt="Card background"
                  className="w-full h-full object-cover"
                  src={item.image}
                />
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-[#e0f2f1] font-medium text-sm mb-1 leading-tight">
                  {item.name}
                </h3>
                <p className="text-[#80cbc4] text-xs opacity-80">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
