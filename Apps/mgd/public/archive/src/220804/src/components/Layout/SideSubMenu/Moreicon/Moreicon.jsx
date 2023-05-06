import React from 'react'
import { Header, Button, Popup, Grid } from 'semantic-ui-react'

const PopupExampleFlowing = () => (
  <Popup floated='right' trigger={<Button>Show flowing popup</Button>} flowing hoverable>
    <Grid centered divided columns={1}>
      <Grid.Column textAlign='center'>
        <Header as='h4'>Basic Plan</Header>
        <p>
          <b>2</b> projects, $10 a month
        </p>
        <Button>Choose</Button>
      </Grid.Column>
    </Grid>
  </Popup>
)

export default PopupExampleFlowing
