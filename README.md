# full-stack-docker-base


# Backend

Nest JS with micro services 
Event Sourcing and RBTMQ Queues

# Graphql playground
http://localhost:4001/graphql


# Healthcheck query

{
  healthCheck {
    customer
    delivery
    order
    simtools {
      delivery
    }
  }
  
}


Expected Response :

{
  "data": {
    "healthCheck": {
      "customer": "pong from customer",
      "delivery": "pong from delivery",
      "order": "pong from order",
      "simtools": {
        "delivery": "Delivery service is accessible from SimTools: pong from delivery"
      }
    }
  }
}




# Front End 

Live Dashboard with next js and GQL Subscriptions
http://localhost:3000


# Supbase 
Base supabase docker setup
http://localhost:9000



# TODO

Simulate a very busy live kichen with dashboard