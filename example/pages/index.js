import { Layout, Link } from '@carbonplan/components'

const Index = () => {
  return (
    <Layout>
      <div>This is not password protected</div>
      <Link href='/protected'>Go to protected page</Link>
    </Layout>
  )
}

export default Index
