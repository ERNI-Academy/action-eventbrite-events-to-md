export interface EventbriteEventsResponse {
  events: EventbriteEvent[]
}

export interface EventbriteEvent {
  name: {
    text: string
  }
  url: string
}
