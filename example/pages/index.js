import { Layout, Link, Row, Column } from '@carbonplan/components'

const Index = () => {
  return (
    <Layout
      title='CarbonPlan – Auth testing page'
      description='Page without authentication'
    >
      <Row>
        <Column
          start={2}
          width={10}
          sx={{ mt: [5, 6, 7, 8], fontSize: [5, 5, 5, 6] }}
        >
          <div>This is not password protected</div>
          <Link href='/protected'>Go to protected page</Link>
        </Column>
      </Row>
    </Layout>
  )
}

export default Index
