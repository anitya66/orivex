import ConversationItem from "./ConversationItem";

function ConversationList({
  conversations,
  selectedConversation,
  onSelect,
}) {
  return (
    <div className="space-y-3">

      {conversations.map((conversation) => (

        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          selected={
            selectedConversation?.id === conversation.id
          }
          onClick={onSelect}
        />

      ))}

    </div>
  );
}

export default ConversationList;