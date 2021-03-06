// interface Message {
//     name string[];
//     description string;
//     title string;
//     text string;
// }

module.exports = [
    {
        names: [
            "add-friend",
            "add-friends",
            "addfriend",
            "af",
        ],
        description: 'Explains how to troubleshoot not being able to add a friend.',
        title: "Add friend",
        "text":
            'If you and your friends are unable to add each other as friends, or can\'t find each other as friends, ' +
            'make sure that you are using a case sensitive username when adding each other. Additionally, it is ' +
            'currently not possible to add people by their user ID, so if you are using a user id to add them as ' +
            'friend this currently does not work but will in the future.'
    },
    {
        names: [
            "add-set-front",
            'addsetfront',
            'addset-front',
            'add-setfront',
            'add-set',
            'addset',
            'add-front',
            'addfront',
            'set-front',
            'setfront',
            'asf',
        ],
        description: 'Talks about how to set who is fronting in the application.',
        title: "Add / set front",
        text:
            'There are two ways in-app to show a member as fronting. Set as front, and add to front.\n' +
            '\n' +
            'Using set as front will clear all members from your front list, and then add that member. Add to front ' +
            'won\'t remove anyone from the list, but it will add the member whose add icon you tapped. You can ' +
            'individually remove members by tapping the downward facing arrow next to their name.'
    },
    {
        names: [
            "avatar",
            "avatars"
        ],
        description: 'Explains why avatars uploaded to Simply Plural does not sync to PluralKit',
        title: "Uploaded Avatars",
        "text":
            'Uploaded avatars on Simply Plural do not sync to PluralKit. This is because we have to pay for the hosting of ' +
            'the avatars and the bandwidth associated with it. Allowing usage outside the app would be too costly for us. ' +
            'If you want avatars synced between PluralKit and Simply Plural, make sure that you use avatar urls intead.'
    },
    {
        names: [
            "custom-fields",
            "customfields",
            "customfield",
            "cfi",
        ],
        description: 'Talks about the "custom fields" feature.',
        title: "Custom fields",
        text:
            'Custom fields are customizable fields for members such as; Birthday, favorite food, system role, etc... ' +
            'You can set them up in settings -> Custom fields. Every field has its own privacy, so you can set some fields ' +
            'to be seen by all your friends, only your trusted friends or only your own system. There is no limit to ' +
            'how many custom fields you can have. '
    },
    {
        names: [
            "custom-front",
            "custom-fronts",
            "customfront",
            "customfronts",
            "cf",
        ],
        description: 'Explains what "custom front" is.',
        title: "Custom fronts",
        text:
            'Custom fronts is a kind of status for fronts, like "blurred", "unknown member", "dissociated", etc... \n' +
            '\n' +
            'You don\'t want those to show up as real members in your system list but you still want to be able to ' +
            'set front as one of them ??? that\'s where custom fronts kick in.\n' +
            '\n' +
            'They\'re highly customizable (as per popular request) so you can name them anything you want.'
    },
    {
        names: [
            "front-history-importing",
            'fronthistoryimporting',
            'fronthistory-importing',
            'front-historyimporting',
            'fronthistoryimport',
            'fronthistory-import',
            'front-historyimport',
            'front-history',
            'fronthistory',
            'front-importing',
            'frontimporting',
            'front-import',
            'frontimport',
            'fhi',
        ],
        description: 'Talks about importing the front history from PluralKit.',
        title: "Front history importing",
        text:
            'Importing your front history to and from PluralKit is planned in the future, but is currently ' +
            'impossible to give any front entries to or take entries from PluralKit until APIv2 for PluralKit is ' +
            'finished. This feature also takes a lower priority than features unique to Simply Plural.'
    },
    {
        names: [
            "messaging",
        ],
        description: 'Talks about the possibility of having a messaging feature.',
        title: "Messaging",
        text: 
            'The feature of messaging other systems within the app is out of scope, the app is not meant to be a ' +
            'social community app but a tool for you and your friends. Adding messages between systems would need ' +
            'us to implement moderation tools, moderation team and the actual feature, which is not the direction ' +
            'we are taking the app in right now.\n' +
            '\n' +
            'Messaging within the system, between headmates, is planned for the future so you can communicate more ' +
            'easily within the system.'
    },
    {
        names: [
            "notifications",
            "notification",
        ],
        description: 'Explains how your friends can get notifications from your system.',
        title: "Notifications",
        text:
            'If you are having trouble receiving front notifications, or your friends have trouble receiving front notifications; please check the following:\n\n' +
            '- You have front notifications enabled for the friend\n- The friend has opted-in into your front notifications' +
            '\n- The friend has enabled notifications for the app in the OS settings (Android, iOS)\n- Your members don\'t prevent front notifications,' +
            ' go into the settings of your members that front and make sure \"Prevent front notifications\" is turned off.' +
            '\n- If they are a trusted friend, make sure that your members that are changing front are visible to trusted friends.\n- If they are a regular friend, make sure that the members that are changing front are visible to all friends.\n' +
            '\nIf all of the above checks out; Do the following; The person who can\'t receive notifications, create a repeated reminder 3 minutes from now. Then wait a few minutes until the notification should arrive.' +
            ' If the notification arrives, then your account has been setup to properly receive notifications and go over the list again to make sure everything checks out.' +
            '\nIf you do not get an automated reminder notification after a few minutes, then please ask for a helper or a moderator to help you with making a ticket so that the developers can look into your specific issue.'
     },
    {
        names: [
            "see-members",
            "seemembers",
            "seembmer",
            "sm",
        ],
        description: 'Explains how to allow your friends to see your members.',
        title: "See members",
        text:
            'If your friends cannot see your members, you have to go into the friend their profile, click on the ' +
            'cogwheel on the right top and press "They can see your shared members", this will allow them to see ' +
            'your public members'
    },
    {
        names: [
            'sync-members-pluralkit',
            'sync-member-pluralkit',
            'syncmemberpluralkit',
            'syncmember-pluralkit',
            'sync-memberpluralkit',
            'syncmemberspluralkit',
            'syncmembers-pluralkit',
            'sync-memberspluralkit',
            'sync-member-plural-kit',
            'syncmemberplural-kit',
            'syncmember-plural-kit',
            'sync-memberplural-kit',
            'syncmembersplural-kit',
            'syncmembers-plural-kit',
            'sync-membersplural-kit',
            'sync-member',
            'syncmember',
            'sync-members',
            'syncmembers',
            'sync-pluralkit',
            'syncpluralkit',
            'sync-plural-kit',
            'syncplural-kit',
            'smp',
            'smpk',
        ],
        description: 'Talks about syncing your members to PluralKit.',
        title: "Sync members to PluralKit",
        text:
            'If you wish to sync your members to PluralKit, go into the settings page -> Integrations -> PluralKit ' +
            'and fill in your PluralKit token, you can get this token by typing pk;token anywhere and PluralKit ' +
            'will message you the token in a DM. \n' +
            '\n' +
            'Once filled out, you can go to actions in the members page and press Sync (rebooting app may be ' +
            'required to see this option after adding the token). You will be prompted with the option to sync to ' +
            'and from pk. \n' +
            '\n' +
            'Pay attention that they are linked by the plural kit id found in the individual member settings in ' +
            'Simply Plural. If you make a member on Simply Plural and you make the same member on PluralKit you ' +
            'will have to go into the individual member settings of Simply Plural and fill in the PluralKit user id ' +
            'in the settings. If you don\'t do this you will end up with duplicate members on Plural Kit.'
    },
    {
        names: [
            "system-relationships",
            "system-relationship",
            "systemrelationships",
            "sr",
        ],
        description: 'Explains what "system relationships" are.',
        title: "System relationships",
        text:
            'This is an open-ended field meant to describe what relationships a headmate has. It can be used to ' +
            'describe the member\'s relationship to the system as a whole, their inner system relationships such as ' +
            'being family, friends, or romantic partners, or it can describe their outer-system relationships with ' +
            'people in the outer world, such as family, friends, and romantic partners.'
    },
    {
        names: [
            "website",
        ],
        title: "Website",
        description: 'Talks about the possibility of having a web portal for Simply Plural.',
        text: 
            'A web portal for Simply Plural is unlikely to be made at the moment. The framework that Simply Plural ' +
            'has been created with has the capability of web development, but it is currently experimental, which ' +
            'would make it buggy and unstable to use. This decision may change later in the year when the framework ' +
            'becomes more stable and once the app is more complete.'
    },
    {
        names: ["moreavatars", "moreavatar", "more-avatars"],
        title: "Avatars",
        description: "Talks about why more avatar functionality won't be added",
        text: "Adding more uploading avatar functionality is not something that's possible for us, we're funded by Patreon and a non-profit, " + 
              "alongside self-funding. Storing and uploading avatars comes with a cost that would expand exponentially if we were to add it to " +
              "more features."
    },
    {
        names: ["token", "tokens"],
        title: "Tokens",
        description: "Talks about what Simply Plural Tokens are",
        text: "Simply Plural Tokens are to enable Third-party integrations development for developers. Right now, there are no Third-party integrations yet " + 
              "and Tokens are only useful for developers. Later down the road, when Third-party integrations are made, you can generate tokens in Simply Plural " +
              "to use those integrations."
    },
    {
        names: ["logs", "log"],
        title: "Logs",
        description: "Talks about how to provide logs to the developers",
        text: "You've been requested to provide logs to the developers in response to the replied message.\nPlease send the logs to the developers by" +
        " going to Settings -> App Options and scroll to the bottom and click \"Share logs\", then select Discord or email. Send it to Amaryllis on Discord, or " +
        "hello@apparyllis.com on email. Then we can look into what's happening!"
    }
]
