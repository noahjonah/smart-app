// implementation details for conversation repository(Never exposed outside server package)
const conversations = new Map<string, string>();

// Exporting a public interface for conversation repository
// exporting converation obj
export const conversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};

// Stand public interface function alone exportation
// export function getLastResponseId(conversationId: string) {
//    return conversations.get(conversationId);
// }

// export function setLastResponseId(
//    conversationId: string,
//    responseId: string
// ) {
//    conversations.set(conversationId, responseId);
// }
