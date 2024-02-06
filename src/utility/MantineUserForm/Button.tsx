import { Button, Group } from "@mantine/core";

type UserResetFormPropTypes = {
    type: "button" | "submit" | "reset"
    onClick?: () => void;
  };

const UserResetForm = ({ onClick, type }: UserResetFormPropTypes) => {
    return (
      <div className="mx-2">
        <Group justify="flex-center" mt="md">
          <Button type={type} onClick={onClick}>
            {type}
          </Button>
        </Group>
      </div>
    );
  };

export default UserResetForm