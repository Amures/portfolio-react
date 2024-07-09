import '../assets/styles/Curves.css';

export const Curves = () => {
  return (
    <div className="container">
          <div className='line line-1'>
            <div className='wave wave1' style={{ backgroundImage: 'url(src/assets/border-img/1.png)' }}></div>
          </div>
          <div className="line line-2">
            <div className="wave wave2" style={{ backgroundImage: 'url(src/assets/border-img/2.png)' }}></div>
          </div>
          <div className="line line-3">
            <div className="wave wave3" style={{ backgroundImage: 'url(src/assets/border-img/3.png)' }}></div>
          </div>
      </div>
  )
}
