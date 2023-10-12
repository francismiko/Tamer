### User

| Field         | Type           | Constraints |
| :------------ | -------------- | ----------- |
| email         | String         | Unique      |
| name          | String         |             |
| gender        | Enum?          |             |
| phone         | Int?           | @unique     |
| conversations | Conversation[] |             |

------

### Conversation

| Field     | Type       | Constraints |
| :-------- | ---------- | ----------- |
| owner     | User       | Foreign     |
| title     | String?    |             |
| messages  | Message[]  |             |
| exercises | Exercise[] |             |
| create_at | DateTime   |             |

------

### Message

| Field        | Type         | Constraints |
| :----------- | ------------ | ----------- |
| content      | String?      |             |
| sender       | Enum         |             |
| status       | Enum         |             |
| conversation | Conversation | Foreign     |
| create_at    | DateTime     |             |

------

### Exercise

| Field           | Type         | Constraints |
| :-------------- | ------------ | ----------- |
| tags            | Enum         |             |
| difficulty      | Enum         |             |
| structure       | Enum         |             |
| validity_status | Enum         |             |
| conversation    | Conversation | Foreign     |
| create_at       | DateTime     |             |

------

### History

| Field | Type | Constraints |
| :---- | ---- | ----------- |
|       |      |             |
|       |      |             |
|       |      |             |

------

