namespace SentinelX.BuildingBlocks.Events
{
    public interface IIntegrationEvent
    {
        Guid EventId { get; }
        DateTime OccurredOnUtc { get; }
    }

    public abstract class IntegrationEvent : IIntegrationEvent
    {
        public Guid EventId { get; } = Guid.NewGuid();
        public DateTime OccurredOnUtc { get; } = DateTime.UtcNow;
    }

    public interface IEventBus
    {
        Task PublishAsync<TEvent>(TEvent @event, CancellationToken cancellationToken = default) 
            where TEvent : IIntegrationEvent;
    }

    public class InMemoryEventBus : IEventBus
    {
        public Task PublishAsync<TEvent>(TEvent @event, CancellationToken cancellationToken = default) 
            where TEvent : IIntegrationEvent
        {
            // Abstraction placeholder: in-memory pub-sub, ready for Kafka / RabbitMQ swap
            return Task.CompletedTask;
        }
    }
}
