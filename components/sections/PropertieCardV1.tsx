// components/sections/PropertieCardV1.tsx

type PropertyCardProps = {
    title: string
    address: string
    price: number
    imageUrl: string
    isNew?: boolean
    isForRent?: boolean
    url: string // Añadido prop para la URL
  }
  
  export default function PropertieCardV1({
    title,
    address,
    price,
    imageUrl,
    isNew = true,
    isForRent = true,
    url
  }: PropertyCardProps) {
    return (
      <a href={url} className="text-decoration-none">
        <div className="property-card border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column justify-content-between">
          <div className="position-absolute h-100 w-100 z-1">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="card-img-top h-100 w-100 object-fit-cover z-1"
              alt={title}
              style={{ 
                height: '300px', 
                objectFit: 'cover', 
                borderRadius: '10px', 
                border: '1px solid #eaeaea',
                transition: 'transform 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          ) : (
            <div style={{ height: '300px', backgroundColor: '#eaeaea', borderRadius: '10px', border: '1px solid #eaeaea' }} />
          )}
            
            <div className="position-absolute top-0 start-0 p-3 d-flex gap-2">
              {isForRent && <span className="badge bg-light text-dark px-3 py-2">For Rent</span>}
              {isNew && <span className="badge bg-dark text-white px-3 py-2">New</span>}
            </div>
          </div>
          <div className="card-body-property text-white h-100 z-3 h-auto p-4">
            <h5 className="card-title text-uppercase fw-bold">{title}</h5>
            <p className="card-text mb-2">
              <i className="bi bi-geo-alt-fill me-1 text-white"></i>
              {address}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5">
                ${price}
                <span className="text-muted fs-6">/month</span>
              </span>
              <span className="btn btn-outline-light rounded-circle p-0 border-0" style={{ width: '32px', height: '32px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" className="bi bi-arrow-up-right-circle" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    )
  }