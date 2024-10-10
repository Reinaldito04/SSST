import GraphComponent from '../components/Grafica'
import LayoutSidebar from '@/app/components/layoutSidebar'
function page() {
  return (
    <LayoutSidebar>
            <div className="container-fluid">
                <GraphComponent/>
            </div>

    </LayoutSidebar>
  )
}

export default page