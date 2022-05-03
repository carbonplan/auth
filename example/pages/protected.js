import { withAuth } from '@carbonplan/auth'
import { Layout, Link } from '@carbonplan/components'

const Protected = () => {
  return (
    <Layout>
      <div>This is password protected</div>
      <Link href='/'>Go to unprotected page</Link>
    </Layout>
  )
}

export default withAuth(Protected, ['admin'])
