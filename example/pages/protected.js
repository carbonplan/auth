import { withAuth } from '@carbonplan/auth'
import { Layout, Link, Row, Column } from '@carbonplan/components'

const Protected = () => {
  return (
    <Layout
      title='CarbonPlan – Auth testing page'
      description='Page with authentication'
    >
      <Row>
        <Column
          start={2}
          width={10}
          sx={{ mt: [5, 6, 7, 8], fontSize: [5, 5, 5, 6] }}
        >
          <div>This is password protected</div>
          <Link href='/'>Go to unprotected page</Link>
        </Column>
      </Row>
    </Layout>
  )
}

export default withAuth(Protected, ['user'])
