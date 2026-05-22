import React from "react";

const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#164456] overflow-hidden">
      {/* 💡 Flat geometric mosaic matrix pattern replicating your background track */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), 
                            linear-gradient(-45deg, #000 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #000 75%), 
                            linear-gradient(-45deg, transparent 75%, #000 75%)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0"
        }}
      />
    </div>
  );
};

export default InteractiveBackground;