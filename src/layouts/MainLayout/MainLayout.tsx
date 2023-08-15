import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import HeaderRms from 'src/components/HeaderRms'
interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <HeaderRms />
      {children}
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
