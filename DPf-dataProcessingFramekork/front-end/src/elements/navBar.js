import './css/navBar.sass'
//import logo from '../img/logo.png'
import './css/modulButton.sass'

export function NavBar({sysStart, sysStop, sysRestart, editMode, toggleModuls}) {
    return (
      <nav className='navBar'>
        <div className="leftNav">
          <h2 className='mb-0'> Data Processing Framework </h2>
        </div>
        <div className="rightNav">
          {editMode && <InactiveNav sysStart={sysStart}/>}
          {!editMode && <ActiveNav sysStop={sysStop} sysRestart={sysRestart}/>}
          <div className='modulsHandlers'>
            <button onClick={toggleModuls}>Moduls</button>
          </div>
        </div>
      </nav>
    );
}

export function ActiveNav ({sysStop, sysRestart}) {
  return(
    <div className='stateHandlers'>
      <button onClick={sysRestart}>Restart</button>
      <button onClick={sysStop}>Stop</button>
    </div>
  )
}

export function InactiveNav ({sysStart}) {
  return(
    <div className='stateHandlers'>
      <button onClick={sysStart}>Start</button>
    </div>
  )
}
