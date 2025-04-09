import { getProtectedContent, logout } from "../actions";
import { AuthGuard } from "../auth-guard";
import { Ninja } from "@egen/ui/ninja";

export default () => {
	return (
		<AuthGuard>
			<h1>Welcome 👋</h1>{" "}
			<button type="button" onClick={logout}>
				Logout
			</button>
			<Ninja onHit={getProtectedContent} />
		</AuthGuard>
	);
};
