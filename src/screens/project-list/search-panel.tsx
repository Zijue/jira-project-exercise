export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(event) =>
          setParam({
            ...param,
            name: event.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(event) =>
          setParam({
            ...param,
            personId: event.target.value,
          })
        }
      >
        <option>负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};