import { PubSub } from "apollo-server-fastify";

const pubsubs: Record<string, PubSub> = {}

const pubsub = new PubSub();

export {
    pubsub
}